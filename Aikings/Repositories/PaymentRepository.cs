using Aikings.Authencation;
using Aikings.Dtos;
using Aikings.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Aikings.Repositories
{
    public class PaymentRepository : IPayment
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public PaymentRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }
        public async Task<int> AddPaymentAsync(PaymentDto model)
        {
            var newPayment = _mapper.Map<Payment>(model);
            _context.Payments.Add(newPayment);
            await _context.SaveChangesAsync();
            return newPayment.Id;
        }

        public async Task DeletePaymentAsync(int id)
        {
            var deletePayment = _context.Payments.SingleOrDefault(x => x.Id == id);
            if (deletePayment != null)
            {
                _context.Payments.Remove(deletePayment);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<PaymentDto>> GetAllPaymentAsync()
        {
            var payments = await _context.Payments.ToListAsync();
            return _mapper.Map<List<PaymentDto>>(payments);
        }

        public async Task<PaymentDto> GetPaymentAsync(int id)
        {
            var payments = await _context.Payments.FindAsync(id);
            return _mapper.Map<PaymentDto>(payments);
        }

        public async Task UpdatePaymentAsync(int id, PaymentDto model)
        {
            if (id == model.Id)
            {
                var updatePayment = _mapper.Map<Payment>(model);
                _context.Payments.Update(updatePayment);
                await _context.SaveChangesAsync();
            }
        }
    }
}
