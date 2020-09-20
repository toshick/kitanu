

.PHONY: nuxt
nuxt:
	cd kitanu && npm ci && npm test && npm run generate