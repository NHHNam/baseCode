using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Aiking.Models;
using Aiking.Repositories;
using Aiking.Dtos;
using Humanizer;
using System.Runtime.Intrinsics.X86;
using Swashbuckle.AspNetCore.Annotations;

namespace Aiking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentRepository _paymentRepository;

        public PaymentsController(IPaymentRepository paymentRepository)
        {
            _paymentRepository = paymentRepository;
        }

        /// <summary>
        /// Retrieves a list of items.
        /// </summary>
        /// <remarks>This endpoint returns a list of items.</remarks>
        /// <returns>A list of items.</returns>
        // GET: api/Payments
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

        // GET: api/Payments/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetPaymentById(int id)
        {
            var payments = await _paymentRepository.GetPaymentAsync(id);
            return payments == null ? NotFound() : Ok(payments);

        }

        [HttpPost("AddPayment")]
        public async Task<ActionResult> AddNewPayment(PaymentDto model)
        {
            var newPayment = await _paymentRepository.AddPaymentAsync(model);
            var payments = await _paymentRepository.GetPaymentAsync(newPayment);
            return payments == null ? NotFound() : Ok(payments);
        }

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

        [HttpDelete("{id}")]
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
