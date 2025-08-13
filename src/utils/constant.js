import {
  PieChartOutlined,
  GlobalOutlined,
  TeamOutlined,
  BankOutlined,
  MedicineBoxOutlined,
  BookOutlined,
  CloudOutlined,
} from "@ant-design/icons";

import DashboardPage from "../pages/DashboardPage/DashboardPage";
import PopulationPage from "../pages/PopulationPage/PopulationPage";
import EconomyPage from "../pages/EconomyPage/EconomyPage";
import HealthPage from "../pages/HealthPage/HealthPage";
import EducationPage from "../pages/EducationPage/EducationPage";
import ClimatePage from "../pages/ClimatePage/ClimatePage";
import CountriesPage from "../pages/CountriesPage/CountriesPage";

export const sidebarMenuItems = [
  {
    key: "dashboard",
    icon: <PieChartOutlined />,
    label: "Dashboard",
    component: <DashboardPage />,
  },
  {
    key: "population",
    icon: <TeamOutlined />,
    label: "Dân số",
    component: <PopulationPage />,
  },
  {
    key: "economy",
    icon: <BankOutlined />,
    label: "Kinh tế",
    component: <EconomyPage />,
  },
  {
    key: "health",
    icon: <MedicineBoxOutlined />,
    label: "Y tế",
    component: <HealthPage />,
  },
  {
    key: "education",
    icon: <BookOutlined />,
    label: "Giáo dục",
    component: <EducationPage />,
  },
  {
    key: "climate",
    icon: <CloudOutlined />,
    label: "Khí hậu & Môi trường",
    component: <ClimatePage />,
  },
  {
    key: "countries",
    icon: <GlobalOutlined />,
    label: "Quốc gia",
    component: <CountriesPage />,
  },
];
