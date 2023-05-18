import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const AdminScreen = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <h1> My Profile</h1>

          <br />
        </TabPane>

        <TabPane tab="Rooms" key="2">
          <h1>rooms</h1>
        </TabPane>
        <TabPane tab="Add Rooms" key="3">
          <h1> Add Rooms</h1>
        </TabPane>
        <TabPane tab="users" key="4">
          <h1>users</h1>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminScreen;
