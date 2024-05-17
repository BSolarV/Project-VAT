<template>
	<div>
		<div v-if="headers.length > 0">
			<h2>Headers</h2>
			<ul>
				<li v-for="(header, index) in headers" :key="index">{{ header.tag }}: {{ header.text }}</li>
			</ul>
		</div>
		<div v-if="scopeData">
			<h2>Scope Data</h2>
			<p><strong>Cell (0,1):</strong> {{ scopeData.cell_0_1 }}</p>
			<p><strong>Cell (2,1):</strong> {{ scopeData.cell_2_1 }}</p>
		</div>
		<div v-if="dataObjects.length > 0">
			<h2>Extracted Data</h2>
			<ul>
				<li v-for="(dataObject, index) in dataObjects" :key="index">
					<p><strong>Name:</strong> {{ dataObject.name }}</p>
					<p><strong>Criticity:</strong> {{ dataObject.criticity }}</p>
					<p><strong>CVSS:</strong> {{ dataObject.cvss }}</p>
					<p><strong>Impact:</strong> {{ dataObject.impact }}</p>
					<p><strong>Risk:</strong> {{ dataObject.risk }}</p>
					<p><strong>Description:</strong> {{ dataObject.description }}</p>
					<p><strong>Recommendation:</strong> {{ dataObject.recommendation }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'DisplayHeaders',
	props: {
		headers: {
			type: Array,
			required: true
		},
		scopeData: {
			type: Object,
			required: false
		},
		dataObjects: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
h2 {
	margin-top: 20px;
}
</style>