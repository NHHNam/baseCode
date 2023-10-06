using Aiking.Dtos;
using Aiking.Models;

namespace Aiking.Repositories
{
    public interface IPaymentRepository
    {
        public Task<List<PaymentDto>> GetAllPaymentAsync();
        public Task<PaymentDto> GetPaymentAsync(int id);
        public Task<int> AddPaymentAsync(PaymentDto model);
        public Task UpdatePaymentAsync(int id, PaymentDto model);
        public Task DeletePaymentAsync(int id); 
    }
}
