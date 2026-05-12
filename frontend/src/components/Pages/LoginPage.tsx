import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/client";
import { SubmitHandler } from "react-hook-form";
import { UserLogin } from "../../api/models/user";


export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserLogin> {
    
  }
}
