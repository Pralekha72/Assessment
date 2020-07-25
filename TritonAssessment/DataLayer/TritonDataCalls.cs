using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer
{
    public class TritonDataCalls
    {

        private string TritonDb = ConfigurationManager.ConnectionStrings["TritonDB"].ConnectionString;

        public IEnumerable<Vehicle> ReadAllVehicleList()
        {
            List<Vehicle> VehicleList = new List<Vehicle>();

            using (SqlConnection con = new SqlConnection(TritonDb))
            {
                SqlCommand cmd = new SqlCommand("spReadAllVehicleList", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Vehicle vehicle = new Vehicle();
                    vehicle.Id = Convert.ToInt32((rdr["Id"] as int?).GetValueOrDefault());
                    vehicle.Name = rdr["Name"].ToString() ?? "";
                    vehicle.Type = rdr["Type"].ToString() ?? "";
                    vehicle.Branch = rdr["Branch"].ToString() ?? "";

                    VehicleList.Add(vehicle);
                }
                con.Close();
            }
            return VehicleList;
        }

        public IEnumerable<WayBills> ReadAllWayBillsList()
        {
            List<WayBills> listWayBills = new List<WayBills>();

            using (SqlConnection con = new SqlConnection(TritonDb))
            {
                SqlCommand cmd = new SqlCommand("spReadAllWayBillsList", con);
                cmd.CommandType = CommandType.StoredProcedure;

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    WayBills waybills = new WayBills();
                    waybills.Id = Convert.ToInt32((rdr["Id"] as int?).GetValueOrDefault());
                    waybills.weight = Convert.ToDecimal((rdr["TotalWeight"] as decimal?).GetValueOrDefault());
                    waybills.NoOfParcels = Convert.ToInt32((rdr["NoOfParcels"] as int?).GetValueOrDefault());
                    waybills.VehicleId = Convert.ToInt32((rdr["VehicleId"] as int?).GetValueOrDefault());

                    listWayBills.Add(waybills);
                }
                con.Close();
            }
            return listWayBills;
        }

        public bool InsertWayBills(WayBills waybills)
        {
            int ret;
            using (SqlConnection con = new SqlConnection(TritonDb))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spAddWayBills", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@weight", waybills.weight);
                cmd.Parameters.AddWithValue("@NoOfParcels", waybills.NoOfParcels);
                cmd.Parameters.AddWithValue("@VehicleId", waybills.vehicle.Id);
                ret = cmd.ExecuteNonQuery();
                con.Close();
            }
            if (ret == 1)
            {
                return true;
            }
            return false;
        }

        public bool UpdateVehicle(Vehicle vehicle)
        {
            int ret;
            using (SqlConnection con = new SqlConnection(TritonDb))
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("spUpdateVehicle", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@Id", vehicle.Id);
                cmd.Parameters.AddWithValue("@Name", vehicle.Name);
                cmd.Parameters.AddWithValue("@Type", vehicle.Type);
                cmd.Parameters.AddWithValue("@Branch", vehicle.Branch);
                ret = cmd.ExecuteNonQuery();
                con.Close();
            }

            if (ret == 1)
            {
                return true;
            }
            return false;
        }
    }
}
