import { useEffect } from "react";

export interface MetaTagsConfig {
	title?: string;
	description?: string;
	keywords?: string;
	author?: string;
	// Open Graph (Facebook, LinkedIn, Discord)
	ogTitle?: string;
	ogDescription?: string;
	ogImage?: string;
	ogUrl?: string;
	ogType?: string;
	ogSiteName?: string;
	// Twitter Card
	twitterCard?: string;
	twitterTitle?: string;
	twitterDescription?: string;
	twitterImage?: string;
	twitterSite?: string;
	twitterCreator?: string;
}

/**
 * Hook to dynamically update meta tags in the document head
 * Useful for SEO and social media sharing
 */
export function useMeta(config: MetaTagsConfig) {
	useEffect(() => {
		// Store original values for cleanup
		const originalTitle = document.title;
		const addedElements: HTMLMetaElement[] = [];

		// Update title
		if (config.title) {
			document.title = config.title;
		}

		// Helper to set or update meta tag
		const setMetaTag = (
			property: string,
			content: string,
			isProperty = false
		) => {
			const selector = isProperty
				? `meta[property="${property}"]`
				: `meta[name="${property}"]`;
			let element = document.querySelector(selector) as HTMLMetaElement;

			if (!element) {
				element = document.createElement("meta");
				if (isProperty) {
					element.setAttribute("property", property);
				} else {
					element.setAttribute("name", property);
				}
				document.head.appendChild(element);
				addedElements.push(element);
			}

			element.setAttribute("content", content);
		};

		// Standard meta tags
		if (config.description) {
			setMetaTag("description", config.description);
		}
		if (config.keywords) {
			setMetaTag("keywords", config.keywords);
		}
		if (config.author) {
			setMetaTag("author", config.author);
		}

		// Open Graph tags (Facebook, LinkedIn, Discord)
		if (config.ogTitle) {
			setMetaTag("og:title", config.ogTitle, true);
		}
		if (config.ogDescription) {
			setMetaTag("og:description", config.ogDescription, true);
		}
		if (config.ogImage) {
			setMetaTag("og:image", config.ogImage, true);
		}
		if (config.ogUrl) {
			setMetaTag("og:url", config.ogUrl, true);
		}
		if (config.ogType) {
			setMetaTag("og:type", config.ogType, true);
		}
		if (config.ogSiteName) {
			setMetaTag("og:site_name", config.ogSiteName, true);
		}

		// Twitter Card tags
		if (config.twitterCard) {
			setMetaTag("twitter:card", config.twitterCard);
		}
		if (config.twitterTitle) {
			setMetaTag("twitter:title", config.twitterTitle);
		}
		if (config.twitterDescription) {
			setMetaTag("twitter:description", config.twitterDescription);
		}
		if (config.twitterImage) {
			setMetaTag("twitter:image", config.twitterImage);
		}
		if (config.twitterSite) {
			setMetaTag("twitter:site", config.twitterSite);
		}
		if (config.twitterCreator) {
			setMetaTag("twitter:creator", config.twitterCreator);
		}

		// Cleanup function
		return () => {
			document.title = originalTitle;
			// Remove only the elements we added
			for (const element of addedElements) {
				element.remove();
			}
		};
	}, [config]);
}
