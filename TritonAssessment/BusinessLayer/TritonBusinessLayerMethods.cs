using DataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class TritonBusinessLayerMethods
    {
        public IEnumerable<Vehicle> GetAllVehicles()
        {
            List<Vehicle> veh = new List<Vehicle>();
            try
            {
                TritonDataCalls contourVoucher = new TritonDataCalls();

                veh = (List<Vehicle>)contourVoucher.ReadAllVehicleList();


            }
            catch (Exception ex)
            {
              //Log Errors
            }
            return veh;
        }

        public IEnumerable<WayBills> GetAllWayBills()
        {
            List<WayBills> waybills = new List<WayBills>();
            try
            {
                TritonDataCalls contourVoucher = new TritonDataCalls();

                waybills = (List<WayBills>)contourVoucher.ReadAllWayBillsList();


            }
            catch (Exception ex)
            {
                //Log Errors
            }
            return waybills;
        }
    }
}
