

.PHONY: nuxt
nuxt:
	cd kitanu && npm test && npm ci && npm run generate