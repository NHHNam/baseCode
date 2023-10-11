using Aikings.Authencation;
using Aikings.Dtos;
using Aikings.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Aikings.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPayment _paymentRepository;

        public PaymentController(IPayment paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        [AllowAnonymous]
        [HttpGet("GetAllPayments")]
        public async Task<ActionResult> GetAllPayments()
        {
            try
            {
                return Ok(await _paymentRepository.GetAllPaymentAsync());
            }
            catch
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpGet("GetBy{id}")]
        public async Task<ActionResult> GetPaymentById(int id)
        {
            var payments = await _paymentRepository.GetPaymentAsync(id);
            return payments == null ? NotFound() : Ok(payments);

        }

        [Authorize]
        [HttpPost("AddPayment")]
        public async Task<ActionResult> AddNewPayment(PaymentDto model)
        {
            var newPayment = await _paymentRepository.AddPaymentAsync(model);
            var payments = await _paymentRepository.GetPaymentAsync(newPayment);
            return payments == null ? NotFound() : Ok(payments);
        }

        [Authorize]
        [HttpPut("UpdatePayment{id}")]
        public async Task<IActionResult> UpdatePayment(int id, PaymentDto model)
        {
            if (id != model.Id)
            {
                return NotFound();
            }
            await _paymentRepository.UpdatePaymentAsync(id, model);
            return Ok();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete("DeleteBy{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _paymentRepository.GetPaymentAsync(id);

            if (payment == null)
            {
                return NotFound();
            }
            await _paymentRepository.DeletePaymentAsync(id);
            return Ok();
        }
    }
}
