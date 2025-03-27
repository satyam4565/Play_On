import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { UserPlus, Mail, Lock, User as UserIcon, ChevronLeft, Eye, EyeOff } from "lucide-react";

const SignUpPage = () => {
	const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

	const [email, setEmail] = useState(emailValue || "");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [passwordStrength, setPasswordStrength] = useState(0);

	const { signup, isSigningUp } = useAuthStore();

	const handleSignUp = (e) => {
		e.preventDefault();
		signup({ email, username, password });
	};

	const handlePasswordChange = (e) => {
		const newPassword = e.target.value;
		setPassword(newPassword);
		
		// Calculate password strength
		let strength = 0;
		if (newPassword.length >= 8) strength += 1;
		if (/[A-Z]/.test(newPassword)) strength += 1;
		if (/[0-9]/.test(newPassword)) strength += 1;
		if (/[^A-Za-z0-9]/.test(newPassword)) strength += 1;
		
		setPasswordStrength(strength);
	};

	// Get password strength text and color
	const getStrengthInfo = () => {
		if (password.length === 0) return { text: "", color: "" };
		
		if (passwordStrength === 0) return { text: "Very Weak", color: "bg-red-600" };
		if (passwordStrength === 1) return { text: "Weak", color: "bg-orange-500" };
		if (passwordStrength === 2) return { text: "Medium", color: "bg-yellow-500" };
		if (passwordStrength === 3) return { text: "Strong", color: "bg-green-500" };
		return { text: "Very Strong", color: "bg-emerald-500" };
	};

	const strengthInfo = getStrengthInfo();

	return (
		<div className='min-h-screen w-full bg-gradient-to-b from-gray-900 to-black flex flex-col'>
			{/* Background shapes */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
				<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3"></div>
			</div>

			<header className='max-w-7xl mx-auto flex items-center justify-between p-6 w-full z-10'>
				<Link to={"/"}>
					<img src='/PLAYON.png' alt='PlayOn logo' className='h-12 w-auto' />
				</Link>
			</header>

			<div className='flex-1 flex justify-center items-center px-4 py-10 z-10'>
				<div className='w-full max-w-md relative'>
					{/* Glass card */}
					<div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"></div>
					
					{/* Card content */}
					<div className="relative p-8 sm:p-10">
						<Link to="/" className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors mb-6">
							<ChevronLeft className="size-4" />
							<span>Back to home</span>
						</Link>
						
						<div className="flex items-center gap-3 mb-6">
							<div className="bg-gradient-to-r from-red-600 to-amber-600 p-2.5 rounded-lg">
								<UserPlus className="size-6 text-white" />
							</div>
							<h1 className='text-white text-2xl font-bold'>Create Account</h1>
						</div>
						
						<p className="text-gray-300 mb-8">Join PlayOn and start streaming your favorite content.</p>

						<form className='space-y-5' onSubmit={handleSignUp}>
							<div>
								<label htmlFor='email' className='text-sm font-medium text-gray-300 block mb-2 flex items-center gap-2'>
									<Mail className="size-4 text-gray-400" />
									<span>Email Address</span>
								</label>
								<input
									type='email'
									className='w-full px-4 py-3.5 rounded-lg bg-gray-800/60 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-gray-500'
									placeholder='you@example.com'
									id='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div>
								<label htmlFor='username' className='text-sm font-medium text-gray-300 block mb-2 flex items-center gap-2'>
									<UserIcon className="size-4 text-gray-400" />
									<span>Username</span>
								</label>
								<input
									type='text'
									className='w-full px-4 py-3.5 rounded-lg bg-gray-800/60 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-gray-500'
									placeholder='johndoe'
									id='username'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									required
								/>
							</div>

							<div>
								<label htmlFor='password' className='text-sm font-medium text-gray-300 block mb-2 flex items-center gap-2'>
									<Lock className="size-4 text-gray-400" />
									<span>Password</span>
								</label>
								<div className="relative">
									<input
										type={showPassword ? 'text' : 'password'}
										className='w-full px-4 py-3.5 rounded-lg bg-gray-800/60 border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all placeholder:text-gray-500 pr-10'
										placeholder='••••••••'
										id='password'
										value={password}
										onChange={handlePasswordChange}
										required
										minLength="6"
									/>
									<button 
										type="button"
										className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
									</button>
								</div>
								
								{/* Password strength indicator */}
								{password.length > 0 && (
									<div className="mt-2">
										<div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
											<div 
												className={`h-full ${strengthInfo.color}`} 
												style={{width: `${(passwordStrength / 4) * 100}%`}}
											></div>
										</div>
										<div className="flex justify-between items-center mt-1.5">
											<p className="text-xs text-gray-500">Password must be at least 6 characters</p>
											{strengthInfo.text && (
												<p className="text-xs font-medium" style={{color: strengthInfo.color === 'bg-red-600' ? '#ef4444' : strengthInfo.color === 'bg-orange-500' ? '#f97316' : strengthInfo.color === 'bg-yellow-500' ? '#eab308' : strengthInfo.color === 'bg-green-500' ? '#22c55e' : '#10b981'}}>
													{strengthInfo.text}
												</p>
											)}
										</div>
									</div>
								)}
								
								{/* Password suggestions */}
								{password.length > 0 && passwordStrength < 3 && (
									<div className="mt-2 space-y-1 bg-gray-800/40 p-3 rounded-lg border border-gray-700/50">
										<p className="text-xs text-gray-300">For a stronger password:</p>
										<ul className="text-xs text-gray-400 ml-4 list-disc">
											{password.length < 8 && <li>Use at least 8 characters</li>}
											{!/[A-Z]/.test(password) && <li>Include uppercase letters</li>}
											{!/[0-9]/.test(password) && <li>Include numbers</li>}
											{!/[^A-Za-z0-9]/.test(password) && <li>Include special characters</li>}
										</ul>
									</div>
								)}
							</div>

							<button
								className='w-full py-3.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-600/25 flex justify-center items-center gap-2'
								disabled={isSigningUp}
							>
								{isSigningUp ? (
									<>
										<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
											<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
										</svg>
										<span>Creating account...</span>
									</>
								) : (
									<>
										<UserPlus className="size-5" />
										<span>Create Account</span>
									</>
								)}
							</button>
						</form>
						
						<div className="relative flex items-center justify-center gap-2 my-8">
							<div className="h-px bg-gray-800 flex-1"></div>
							<span className="text-gray-500 text-sm px-2">OR</span>
							<div className="h-px bg-gray-800 flex-1"></div>
						</div>
						
						<div className="space-y-4">
							<button className="w-full flex items-center justify-center gap-2 bg-gray-800/80 hover:bg-gray-800 border border-gray-700/50 py-3 px-4 rounded-lg transition-colors">
								<svg className="size-5" viewBox="0 0 24 24" fill="none">
									<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
									<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
									<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
									<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
								</svg>
								<span className="text-white">Sign up with Google</span>
							</button>
						</div>
						
						<div className='text-center text-gray-400 mt-8'>
							Already a member?{" "}
							<Link to={"/login"} className='text-red-500 hover:text-red-400 font-medium'>
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</div>
			
			<div className='py-4 text-gray-500 text-center text-sm z-10'>
				<p>© 2024 PlayOn. All rights reserved.</p>
			</div>
		</div>
	);
};
export default SignUpPage;
