import SideBar from "../components/sidebar/SideBar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
