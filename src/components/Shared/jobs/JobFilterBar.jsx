import React, { useState, useMemo } from "react";
import {
  Select,
  Label,
  Description,
  Header,
  ListBox,
  TextField,
  InputGroup,
} from "@heroui/react";

export default function JobFilterBar({ jobs = [], onFilter }) {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [category, setCategory] = useState("all");
  const [remote, setRemote] = useState("all");

  // 🔍 Filtering logic
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    // SEARCH (title + company)
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(q) ||
          job.companyName?.toLowerCase().includes(q),
      );
    }

    // JOB TYPE FILTER
    if (jobType !== "all") {
      result = result.filter((job) => job.jobType === jobType);
    }

    // CATEGORY FILTER
    if (category !== "all") {
      result = result.filter((job) => job.category === category);
    }

    // REMOTE FILTER
    if (remote !== "all") {
      result = result.filter((job) =>
        remote === "remote" ? job.isRemote === true : job.isRemote === false,
      );
    }

    return result;
  }, [jobs, search, jobType, category, remote]);

  // send filtered data to parent
  React.useEffect(() => {
    onFilter?.(filteredJobs);
  }, [filteredJobs, onFilter]);

  return (
    <div className="w-full flex flex-col gap-4 p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
      {/* SEARCH INPUT */}
      <TextField>
        <Label className="text-zinc-300">Search Jobs</Label>
        <InputGroup>
          <InputGroup.Input
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-zinc-200"
          />
        </InputGroup>
      </TextField>

      {/* FILTER ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* JOB TYPE */}
        <Select value={jobType} onValueChange={setJobType}>
          <Label className="text-zinc-300">Job Type</Label>
          <Select.Trigger className="text-zinc-200">
            <Select.Value placeholder="Select job type" />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item value="all">
                <Label>All Types</Label>
              </ListBox.Item>
              <ListBox.Item value="full-time">
                <Label>Full-time</Label>
              </ListBox.Item>
              <ListBox.Item value="part-time">
                <Label>Part-time</Label>
              </ListBox.Item>
              <ListBox.Item value="contract">
                <Label>Contract</Label>
              </ListBox.Item>
              <ListBox.Item value="internship">
                <Label>Internship</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* CATEGORY */}
        <Select value={category} onValueChange={setCategory}>
          <Label className="text-zinc-300">Category</Label>
          <Select.Trigger>
            <Select.Value placeholder="Select category" />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item value="all">
                <Label>All Categories</Label>
              </ListBox.Item>
              <ListBox.Item value="Engineering">
                <Label>Engineering</Label>
              </ListBox.Item>
              <ListBox.Item value="Design">
                <Label>Design</Label>
              </ListBox.Item>
              <ListBox.Item value="Marketing">
                <Label>Marketing</Label>
              </ListBox.Item>
              <ListBox.Item value="AI">
                <Label>AI / ML</Label>
              </ListBox.Item>
              <ListBox.Item value="Data">
                <Label>Data</Label>
              </ListBox.Item>
              <ListBox.Item value="Operations">
                <Label>Operations</Label>
              </ListBox.Item>
              <ListBox.Item value="Sales">
                <Label>Sales</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* REMOTE */}
        <Select value={remote} onValueChange={setRemote}>
          <Label className="text-zinc-300">Work Mode</Label>
          <Select.Trigger>
            <Select.Value placeholder="Remote or On-site" />
            <Select.Indicator />
          </Select.Trigger>

          <Select.Popover>
            <ListBox>
              <ListBox.Item value="all">
                <Label>All</Label>
              </ListBox.Item>
              <ListBox.Item value="remote">
                <Label>Remote</Label>
              </ListBox.Item>
              <ListBox.Item value="onsite">
                <Label>On-site</Label>
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* RESULT COUNT (optional UI feedback) */}
      <div className="text-sm text-zinc-400">
        Showing <span className="text-white">{filteredJobs.length}</span> jobs
      </div>
    </div>
  );
}
