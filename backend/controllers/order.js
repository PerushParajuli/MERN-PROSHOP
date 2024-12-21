app.post('/api/create-order', async (req, res) => {
    const { formData, cart } = req.body;
  
    // Simulate session retrieval (Replace this with actual session handling)
    const session = req.session; // Assuming session is stored here
    if (!session.isLoggedIn) {
      return res.status(401).json({ error: "User not found" });
    }
  
    const userId = session.user.id; // Get the userId from session
    const address = formData.address;
    const state = formData.state;
    const city = formData.city;
    const country = formData.country;
    const pinCode = parseInt(formData.pinCode);
    const phoneNo = parseInt(formData.phoneNo);
    const paymentMethod = formData.payment_method;
  
    if (!address || !state || !city || !country || !pinCode || !phoneNo) {
      return res.status(400).json({ error: "Please fill all fields" });
    }
  
    try {
      // Prepare cart details for order creation
      const cartDetails = cart?.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));
  
      // Create the order in the database, associating it with the user
      const order = await prisma.order.create({
        data: {
          userId: userId,
          addressInfo: {
            create: { address, state, city, country, pinCode, phoneNo },
          },
          OrderItem: {
            create: cartDetails,
          },
        },
      });
  
      if (!order) {
        return res.status(500).json({ error: "Order not created" });
      }
  
      // Calculate total amount and convert to Paisa (1 NPR = 100 Paisa)
      const totalAmount = cart.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
      const amountInPaisa = totalAmount * 100;
  
      // Prepare Khalti Payment Request
      const paymentPayload = {
        return_url: process.env.FRONTEND_URL/success/${order.id},
        website_url: process.env.FRONTEND_URL,
        amount: amountInPaisa,
        purchase_order_id: order.id.toString(),
        purchase_order_name: "Order Payment",
        customer_info: {
          name: session.user?.name,
          email: session.user?.email,
          phone: phoneNo,
        },
        amount_breakdown: [
          {
            label: "Total",
            amount: amountInPaisa,
          },
        ],
        product_details: cart.map((item) => ({
          identity: item.product.id.toString(),
          name: item.product.name,
          total_price: item.product.price * 100, // In Paisa
          quantity: item.quantity,
          unit_price: item.product.price * 100, // In Paisa
        })),
      };
  
      if (paymentMethod === "khalti") {
        const response = await axios.post(
          "https://a.khalti.com/api/v2/epayment/initiate/",
          paymentPayload,
          {
            headers: {
              Authorization: Key ${KHALTI_SECRET_KEY},
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.data && response.data.payment_url) {
          return res.json({ paymentUrl: response.data.payment_url }); // Return Khalti payment URL
        } else {
          return res.status(500).json({ error: "Khalti payment initiation failed" });
        }
      } else {
        return res.status(400).json({ error: "Invalid payment method" });
      }
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ error: "Order not created" });
    }
  });