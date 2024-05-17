<template>
	<div>
		<input type="file" @change="handleFileUpload" />
		<DisplayHeaders :headers="headers" :scopeData="scopeData" :dataObjects="dataObjects"
			v-if="headers.length > 0 || dataObjects.length > 0" />
	</div>
</template>

<script>
import mammoth from 'mammoth';
import DisplayHeaders from './DisplayHeaders.vue';

export default {
	name: 'UploadDoc',
	components: {
		DisplayHeaders
	},
	data() {
		return {
			headers: [],
			scopeData: null,
			dataObjects: []
		};
	},
	methods: {
		handleFileUpload(event) {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onload = (e) => {
					const arrayBuffer = e.target.result;
					this.extractHeaders(arrayBuffer);
				};
				reader.readAsArrayBuffer(file);
			}
		},
		async extractHeaders(arrayBuffer) {
			try {
				const result = await mammoth.convertToHtml({ arrayBuffer: arrayBuffer });
				const html = result.value;
				const parser = new DOMParser();
				const doc = parser.parseFromString(html, 'text/html');
				const headers = [];
				const headerTags = ['H1', 'H2', 'H3'];

				headerTags.forEach(tag => {
					doc.querySelectorAll(tag).forEach(header => {
						headers.push({ tag, text: header.innerText });
					});
				});

				// Encontrar el H2 con el texto "Alcance" y procesar su tabla
				const alcanceH2 = Array.from(doc.querySelectorAll('H2')).find(header => header.innerText.trim() === 'Alcance');
				if (alcanceH2) {
					console.log('Alcance H2 encontrado. Analizando la tabla:');
					let sibling = alcanceH2.nextElementSibling;
					while (sibling && sibling.tagName !== 'H2') {
						if (sibling.tagName === "TABLE") {
							this.processScopeTable(sibling);
							break;
						}
						sibling = sibling.nextElementSibling;
					}
				} else {
					console.log('No se encontró un H2 con el texto "Alcance".');
				}

				// Encontrar el H2 con el texto "Evidencias" y procesar sus tablas
				const evidenciasH2 = Array.from(doc.querySelectorAll('H2')).find(header => header.innerText.trim() === 'Evidencias');
				if (evidenciasH2) {
					console.log('Evidencias H2 encontrado. Analizando tablas:');
					let sibling = evidenciasH2.nextElementSibling;
					while (sibling && sibling.tagName !== 'H2') {
						if (sibling.tagName === "TABLE") {
							this.processEvidenceTable(sibling);
						}
						sibling = sibling.nextElementSibling;
					}
				} else {
					console.log('No se encontró un H2 con el texto "Evidencias".');
				}

				this.headers = headers;
			} catch (error) {
				console.error('Error extracting headers:', error);
			}
		},
		processScopeTable(table) {
			const rows = table.querySelectorAll('tr');
			if (rows.length >= 3) {
				const scopeData = {
					cell_0_1: rows[0].querySelectorAll('td, th')[1]?.innerText || '',
					cell_2_1: rows[2].querySelectorAll('td, th')[1]?.innerText || ''
				};

				this.scopeData = scopeData;
				console.log('Datos de alcance extraídos:', scopeData);
			} else {
				console.log('La tabla de alcance no tiene suficientes filas.');
			}
		},
		processEvidenceTable(table) {
			const rows = table.querySelectorAll('tr');
			if (rows.length >= 7) {
				const dataObject = {
					name: rows[0].querySelectorAll('td, th')[1]?.innerText || '',
					criticity: rows[1].querySelectorAll('td, th')[2]?.innerText || '',
					cvss: rows[2].querySelectorAll('td, th')[2]?.innerText || '',
					impact: rows[3].querySelectorAll('td, th')[2]?.innerText || '',
					risk: rows[4].querySelectorAll('td, th')[2]?.innerText || '',
					description: rows[5].querySelectorAll('td, th')[2]?.innerText || '',
					recommendation: rows[6].querySelectorAll('td, th')[2]?.innerText || ''
				};

				// Guardar el objeto en la lista
				this.dataObjects.push(dataObject);
				console.log('Datos extraídos:', dataObject);
			} else {
				console.log('La tabla de evidencias no tiene suficientes filas.');
			}
		}
	}
}
</script>

<style scoped>
input {
	margin-bottom: 20px;
}
</style>