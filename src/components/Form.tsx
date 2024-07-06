
import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [error, setError] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name || !formData.phoneNumber || !formData.email) {
      setError("Please fill in all fields");
    } else {
      localStorage.setItem("userDetails", JSON.stringify(formData));
      window.location.href = "/second-page";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "180px",
      }}
    >
      <h2 style={{ fontSize: 40 }}>Welcome to Assignment</h2>
      <Stack>
        <TextField
          sx={{ width: "400px" }}
          label="Name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          margin="normal"
        />
        <TextField
          sx={{ width: "400px" }}
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(event) =>
            setFormData({ ...formData, phoneNumber: event.target.value })
          }
          margin="normal"
        />
        <TextField
          sx={{ width: "400px" }}
          label="Email"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
          margin="normal"
          inputProps={{
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          }}
          type="email"
        />
      </Stack>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default Form;
