import React from "react";
import { Alert, Calendar } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import Layout from "../components/Layout";
import TasksCalendar from "../components/TasksCalendar";

export default function Tasks() {
  return (
    <Layout>
        <h1>Tasks</h1>
        <hr />
        <TasksCalendar />
    </Layout>
  );
}
