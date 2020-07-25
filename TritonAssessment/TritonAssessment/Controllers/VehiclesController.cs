using DataLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TritonAssessment.Controllers
{
    public class VehiclesController : Controller
    {
        // GET: Vehicles

        [HttpGet]
        public ActionResult Vehicles()
        {
            TritonDataCalls _TritonData = new TritonDataCalls();
            var VehicleList = _TritonData.ReadAllVehicleList().ToList();

            var vehicleL = VehicleList.Select(i => new { i.Id, i.Name, i.Type, i.Branch }).ToList();

            JsonResult json = Json(new { data = vehicleL });
            json.MaxJsonLength = int.MaxValue;

            return json;
        }


        [HttpGet]
        public ActionResult WayBills()
        {
            TritonDataCalls _TritonData = new TritonDataCalls();
            var WayBillsList = _TritonData.ReadAllWayBillsList().ToList();

            var wayBillsList = WayBillsList.Select(i => new { i.Id, i.weight, i.NoOfParcels, i.vehicle.Name }).ToList();

            JsonResult json = Json(new { data = wayBillsList });
            json.MaxJsonLength = int.MaxValue;

            return json;
        }


        [HttpPost]
        public JsonResult UpdateVehicleData(List<Vehicle> vehicleData)
        {
            TritonDataCalls _TritonData = new TritonDataCalls();

            bool UpdatedStatus = false;
            try
            {
                foreach (Vehicle veh in vehicleData)
                {
                    try
                    {
                        if (veh.Id > 0)
                        {
                            UpdatedStatus = _TritonData.UpdateVehicle(veh);
                        }
                    }
                    catch (Exception ex)
                    {
                        //Log errors
                    }
                }
                return Json(new { SuccessData = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {

                return Json(new { SuccessData = false }, JsonRequestBehavior.AllowGet);
            }

        }


        [HttpPost]
        public JsonResult InsertWayBillData(List<WayBills> wayBillData)
        {
            TritonDataCalls _TritonData = new TritonDataCalls();

            bool UpdatedStatus = false;
            try
            {
                foreach (WayBills waybill in wayBillData)
                {
                    try
                    {
                        if (waybill.Id > 0)
                        {
                            UpdatedStatus = _TritonData.InsertWayBills(waybill);
                        }
                    }
                    catch (Exception ex)
                    {
                        //Log errors
                    }
                }
                return Json(new { SuccessData = true }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //log errors
                return Json(new { SuccessData = false }, JsonRequestBehavior.AllowGet);
            }

        }
    }
}
    