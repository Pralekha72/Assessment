using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public class WayBills
    {
        public int Id { get; set; }

        public decimal weight { get; set; }

        public int NoOfParcels { get; set; }

        public int VehicleId { get; set; }

        public Vehicle vehicle { get; set; }
    }
}
