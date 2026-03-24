import Product from "../models/Product.js";

/* ======================
GET ALL PRODUCTS
====================== */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ======================
CREATE PRODUCT (Real-time)
====================== */
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, image } = req.body;
    
    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image
    });

    // Real-time notification
    const io = req.app.get("io");
    if (io) {
      io.emit("product:new", product);
      console.log(`[SOCKET] Broadcasted new product: ${name}`);
    }

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
UPDATE PRODUCT (Real-time)
====================== */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Real-time notification
    const io = req.app.get("io");
    if (io) {
      io.emit("product:updated", product);
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ======================
DELETE PRODUCT (Real-time)
====================== */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Real-time notification
    const io = req.app.get("io");
    if (io) {
      io.emit("product:deleted", req.params.id);
    }

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
