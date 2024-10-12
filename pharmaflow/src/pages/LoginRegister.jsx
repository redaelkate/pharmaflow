import React, { useState } from 'react';
import { Lock, LogIn, User } from 'lucide-react';

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-lg rounded-lg ${className}`}>
    {children}
  </div>
);

const Input = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${className}`}
  />
);

const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${className}`}
  >
    {children}
  </button>
);

const LoginPage = (setState) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    if (!username || !password) {
      alert('Please enter username and password');
    }
    if (username === 'admin' && password === 'admin') {
      alert('Logged in successfully');
    }
    console.log('Login submitted:', { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">PharmaFlow <br/>-Login-</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 border-green-300 focus:border-green-500 focus:ring-green-500"
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Log In
          </Button>
        </form>
        <div onClick={()=>{setState('register')}} className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
          <br/>
          <a onClick={()=>{setState('register')}} className="text-sm text-blue-600 hover:underline">Create an account?</a>
        </div>
      </Card>
    </div>
  );
};





const RadioButton = ({ id, name, value, checked, onChange, label, icon: Icon }) => (
  <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
    <input
      id={id}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="form-radio text-blue-600"
    />
    <label htmlFor={id} className="flex items-center cursor-pointer">
      {Icon && <Icon size={18} className="mr-2 text-gray-600" />}
      <span>{label}</span>
    </label>
  </div>
);

const RegisterPage = (setState) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100 p-4">
      <Card className="w-full max-w-md p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700">PharmaCare Registration</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
            icon={User}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
            icon={Mail}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
            icon={Lock}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border-green-300 focus:border-green-500 focus:ring-green-500"
            icon={Lock}
          />
          <div className="space-y-2">
            <p className="font-semibold text-gray-700">I am registering as a:</p>
            <RadioButton
              id="client"
              name="userType"
              value="client"
              checked={formData.userType === 'client'}
              onChange={handleChange}
              label="Client"
              icon={Users}
            />
            <RadioButton
              id="employee"
              name="userType"
              value="employee"
              checked={formData.userType === 'employee'}
              onChange={handleChange}
              label="Employee"
              icon={Briefcase}
            />
            <RadioButton
              id="supplier"
              name="userType"
              value="supplier"
              checked={formData.userType === 'supplier'}
              onChange={handleChange}
              label="Supplier"
              icon={Truck}
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Register
          </Button>
        </form>
        <div className="mt-4 text-center" onClick={()=>{setState('login')}}>
          <a href="#" className="text-sm text-blue-600 hover:underline">Already have an account? Log in</a>
        </div>
      </Card>
    </div>
  );
};
const MainPage=(setState,state)=>
{
    
  return (<> 
  {state ==='login'    &&   <LoginPage setState={setState}      />} 
  {state ==='register' &&   <RegisterPage setState={setState}   />}
  </>);

}


export default LoginPage;