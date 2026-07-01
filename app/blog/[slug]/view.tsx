"use client";

import { useEffect } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
	useEffect(() => {
		const incrementView = async () => {
			try {
				const response = await fetch("/api/incr", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ slug }),
				});

				if (response.ok) {
					const data = await response.json();
					console.log(`View counted for ${slug}. Total views: ${data.views}`);
				} else {
					const errorData = await response.json();
					console.error(`API error (${response.status}):`, errorData.error);
				}
			} catch (error) {
				console.error("Failed to increment view count:", error);
			}
		};

		incrementView();
	}, [slug]);

	return null;
};