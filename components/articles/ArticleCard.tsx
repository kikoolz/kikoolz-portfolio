"use client";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useSpring,
} from "framer-motion";

import { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
	const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
	const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

	function onMouseMove({ currentTarget, clientX, clientY }: any) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}
	const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
	const style = { maskImage, WebkitMaskImage: maskImage };

	return (
		<div
			onMouseMove={onMouseMove}
			className={`group relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700/60 bg-white dark:bg-zinc-900/40 backdrop-blur-md transition-all duration-500 hover:border-zinc-400 dark:hover:border-zinc-400/60 hover:shadow-2xl hover:shadow-zinc-900/40 hover:-translate-y-1 ${className}`}
		>
			<div className="pointer-events-none">
				<div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-200/20 dark:from-zinc-800/30 to-transparent transition duration-1000" />
				<motion.div
					className="absolute inset-0 z-10 bg-gradient-to-br from-zinc-100/5 dark:from-white/10 via-zinc-300/5 dark:via-zinc-200/10 to-transparent opacity-0 transition duration-700 group-hover:opacity-100"
					style={style}
				/>
				<motion.div
					className="absolute inset-0 z-10 opacity-0 mix-blend-overlay transition duration-700 group-hover:opacity-80"
					style={style}
				/>
			</div>

			{children}
		</div>
	);
};