using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using phlo_test_server.DBContext;
using phlo_test_server.Models;

namespace phlo_test_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SaleOrderController : ControllerBase
    {
        private readonly SaleDBContext _context;

        public SaleOrderController(SaleDBContext context)
        {
            _context = context;
        }

        // GET: api/SaleOrder
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleOrder>>> GetSaleOrder()
        {
          if (_context.SaleOrder == null)
          {
              return NotFound();
          }
            return await _context.SaleOrder.ToListAsync();
        }

        // GET: api/SaleOrder/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SaleOrder>> GetSaleOrder(int id)
        {
          if (_context.SaleOrder == null)
          {
              return NotFound();
          }
            var saleOrder = await _context.SaleOrder.FindAsync(id);

            if (saleOrder == null)
            {
                return NotFound();
            }

            return saleOrder;
        }

        // PUT: api/SaleOrder/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSaleOrder(int id, SaleOrder saleOrder)
        {
            if (id != saleOrder.SaleOrderId)
            {
                return BadRequest();
            }

            _context.Entry(saleOrder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleOrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SaleOrder
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SaleOrder>> PostSaleOrder(SaleOrder saleOrder)
        {
          if (_context.SaleOrder == null)
          {
              return Problem("Entity set 'SaleDBContext.SaleOrder'  is null.");
          }
            _context.SaleOrder.Add(saleOrder);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSaleOrder", new { id = saleOrder.SaleOrderId }, saleOrder);
        }

        // DELETE: api/SaleOrder/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSaleOrder(int id)
        {
            if (_context.SaleOrder == null)
            {
                return NotFound();
            }
            var saleOrder = await _context.SaleOrder.FindAsync(id);
            if (saleOrder == null)
            {
                return NotFound();
            }

            _context.SaleOrder.Remove(saleOrder);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleOrderExists(int id)
        {
            return (_context.SaleOrder?.Any(e => e.SaleOrderId == id)).GetValueOrDefault();
        }
    }
}
