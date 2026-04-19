const notFoundMiddleware = (req, res) => {
    res.status(404).json({
      success: false,
      message: "Route tidak ditemukan"
    });
  };
  
  export default notFoundMiddleware;