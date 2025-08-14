import {
  PieChartOutlined,
  GlobalOutlined,
  TeamOutlined,
  BankOutlined,
  MedicineBoxOutlined,
  BookOutlined,
  CloudOutlined,
} from "@ant-design/icons";

import {
  FaUsers,
  FaDollarSign,
  FaCloud,
  FaBriefcase,
  FaChartLine,
  FaShip,
  FaTruck,
  FaCity,
  FaWifi,
  FaCloudMeatball,
  FaBook,
  FaHospital,
} from "react-icons/fa";

import DashboardPage from "../pages/DashboardPage/DashboardPage";
import PopulationPage from "../pages/PopulationPage/PopulationPage";
import EconomyPage from "../pages/EconomyPage/EconomyPage";
import HealthPage from "../pages/HealthPage/HealthPage";
import EducationPage from "../pages/EducationPage/EducationPage";
import ClimatePage from "../pages/ClimatePage/ClimatePage";
import CountriesPage from "../pages/CountriesPage/CountriesPage";
import { fetchAllCountries } from "../services/api/worldbankAPI";

// các chức năng của sidebar
export const sidebarMenuItems = [
  {
    key: "dashboard",
    icon: <PieChartOutlined />,
    label: "Dashboard",
    component: DashboardPage,
    isLoading: true
  },
  {
    key: "population",
    icon: <TeamOutlined />,
    label: "Dân số",
    component: PopulationPage,
    isLoading: true
  },
  {
    key: "economy",
    icon: <BankOutlined />,
    label: "Kinh tế",
    component: EconomyPage,
  },
  {
    key: "health",
    icon: <MedicineBoxOutlined />,
    label: "Y tế",
    component: HealthPage,
  },
  {
    key: "education",
    icon: <BookOutlined />,
    label: "Giáo dục",
    component: EducationPage,
  },
  {
    key: "climate",
    icon: <CloudOutlined />,
    label: "Khí hậu & Môi trường",
    component: ClimatePage,
  },
  {
    key: "countries",
    icon: <GlobalOutlined />,
    label: "Quốc gia",
    component: CountriesPage,
  },
];

// các chỉ số tổng quát của trang dashboard
export const statsConfigInDashboard = [
  { title: "Dân số", code: "SP.POP.TOTL", icon: <FaUsers /> },
  { title: "GDP (USD)", code: "NY.GDP.MKTP.CD", icon: <FaDollarSign /> },
  {
    title: "GDP bình quân đầu người (USD)",
    code: "NY.GDP.PCAP.CD",
    icon: <FaDollarSign />,
  },
  { title: "Tuổi thọ trung bình", code: "SP.DYN.LE00.IN", icon: <FaCloud /> },
  {
    title: "Tỷ lệ thất nghiệp (%)",
    code: "SL.UEM.TOTL.ZS",
    icon: <FaBriefcase />,
  },
  {
    title: "Tỷ lệ lạm phát (%)",
    code: "FP.CPI.TOTL.ZG",
    icon: <FaChartLine />,
  },
  {
    title: "Xuất khẩu hàng hóa & dịch vụ (% GDP)",
    code: "NE.EXP.GNFS.ZS",
    icon: <FaShip />,
  },
  {
    title: "Nhập khẩu hàng hóa & dịch vụ (% GDP)",
    code: "NE.IMP.GNFS.ZS",
    icon: <FaTruck />,
  },
  {
    title: "Dân số thành thị (%)",
    code: "SP.URB.TOTL.IN.ZS",
    icon: <FaCity />,
  },
  {
    title: "Sử dụng Internet (% dân số)",
    code: "IT.NET.USER.ZS",
    icon: <FaWifi />,
  },
  {
    title: "Phát thải CO₂ (tấn/người)",
    code: "EN.ATM.CO2E.PC",
    icon: <FaCloudMeatball />,
  },
  {
    title: "Chi tiêu cho giáo dục (% GDP)",
    code: "SE.XPD.TOTL.GD.ZS",
    icon: <FaBook />,
  },
  {
    title: "Chi tiêu cho y tế (% GDP)",
    code: "SH.XPD.CHEX.GD.ZS",
    icon: <FaHospital />,
  },
];

export const currentYear = new Date().getFullYear();
export const years = Array.from(
  { length: currentYear - 1960 + 1 },
  (_, i) => 1960 + i
);

let countriesPromise;
export function fetchCountriesOnce() {
  if (!countriesPromise) {
    countriesPromise = fetchAllCountries();
  }
  return countriesPromise;
}

