import React, { useState } from 'react';
import axios from 'axios';
import type { CascaderProps } from 'antd';

const Reg: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    isInvestor: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users', formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
};

export default function Registration() {
  return <div>Registration</div>;
}
