import vue from "eslint-plugin-vue"
import js from "@eslint/js"
import prettier from "eslint-config-prettier"

export default [
	js.configs.recommended,
	...vue.configs["flat/recommended"],
	prettier,
	{
		files: ["**/*.vue", "**/*.js"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			"vue/multi-word-component-names": "off",
			languageOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				// declare common globals used in browser code so eslint doesn't report them as undefined
				globals: {
					console: "readonly",
					window: "readonly",
					document: "readonly",
				},
			},
		},
	},
]
