namespace phlo_test_server.Models
{
    public class SaleOrder
    {
        public int SaleOrderId { get; set; }
        public string? CustomerName { get; set; }
        public string Product { get; set; }
        public float SaleOrderPrice { get; set; }

    }
}