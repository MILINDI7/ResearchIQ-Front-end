import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { ResearcherDashboard } from "./pages/ResearcherDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PartnerDashboard } from "./pages/PartnerDashboard";
import { ResearchManagerDashboard } from "./pages/ResearchManagerDashboard";
import { DepartmentHeadDashboard } from "./pages/DepartmentHeadDashboard";
import { ResearcherProfile } from "./pages/ResearcherProfile";
import { UploadResearch } from "./pages/UploadResearch";
import { FindCollaborators } from "./pages/FindCollaborators";
import { ProjectsBrowse } from "./pages/ProjectsBrowse";
import { CollaborationNetwork } from "./pages/CollaborationNetwork";
import { ResearchTrends } from "./pages/ResearchTrends";
import { FundingOpportunities } from "./pages/FundingOpportunities";
import { ExpertiseMap } from "./pages/ExpertiseMap";
import { FeedPage } from "./pages/FeedPage";
import { DiscoverPage } from "./pages/DiscoverPage";
import { MyProfile } from "./pages/MyProfile";
import { SettingsPage } from "./pages/SettingsPage";
import { DataIntegration } from "./pages/DataIntegration";
import { UserAccessManagement } from "./pages/UserAccessManagement";
import { RequestsPage } from "./pages/RequestsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/researcher/dashboard",
    element: <ResearcherDashboard />,
  },
  {
    path: "/feed",
    element: <FeedPage />,
  },
  {
    path: "/discover",
    element: <DiscoverPage />,
  },
  {
    path: "/requests",
    element: <RequestsPage />,
  },
  {
    path: "/my-profile",
    element: <MyProfile />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/data-integration",
    element: <DataIntegration />,
  },
  {
    path: "/user-access-management",
    element: <UserAccessManagement />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/partner/dashboard",
    element: <PartnerDashboard />,
  },
  {
    path: "/manager/dashboard",
    element: <ResearchManagerDashboard />,
  },
  {
    path: "/department/dashboard",
    element: <DepartmentHeadDashboard />,
  },
  {
    path: "/researcher/profile/:id",
    element: <ResearcherProfile />,
  },
  {
    path: "/researcher/upload",
    element: <UploadResearch />,
  },
  {
    path: "/collaborators",
    element: <FindCollaborators />,
  },
  {
    path: "/projects",
    element: <ProjectsBrowse />,
  },
  {
    path: "/network",
    element: <CollaborationNetwork />,
  },
  {
    path: "/trends",
    element: <ResearchTrends />,
  },
  {
    path: "/funding",
    element: <FundingOpportunities />,
  },
  {
    path: "/expertise-map",
    element: <ExpertiseMap />,
  },
]);
