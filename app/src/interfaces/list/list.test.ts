import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';
import { describe, expect, it, vi } from 'vitest';
import List from './list.vue';

vi.mock('@/utils/render-string-template', () => ({
	renderStringTemplate: () => ({ displayValue: { value: 'Clean Code' } }),
}));

const DraggableStub = defineComponent({
	name: 'Draggable',
	props: {
		modelValue: {
			type: Array,
			default: () => [],
		},
	},
	setup(props, { slots }) {
		return () =>
			h(
				'div',
				props.modelValue.map((element, index) => slots.item?.({ element, index })),
			);
	},
});

const VDrawerStub = defineComponent({
	name: 'VDrawer',
	props: {
		modelValue: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['apply'],
	setup(props, { slots }) {
		return () => (props.modelValue ? h('div', [slots.title?.(), slots.actions?.(), slots.default?.()]) : null);
	},
});

const VFormStub = defineComponent({
	name: 'VForm',
	props: ['modelValue'],
	emits: ['update:modelValue'],
	template: '<div />',
});

describe('list interface', () => {
	it('removes stale nested item fields when the form unsets a value', async () => {
		const wrapper = mount(List, {
			props: {
				value: [{ title: 'Clean Code', review: 'Old review' }],
				fields: [
					{ field: 'title', name: 'Title', schema: { default_value: null } },
					{ field: 'review', name: 'Review', schema: { default_value: null } },
				],
			},
			global: {
				mocks: {
					$t: (key: string) => key,
				},
				directives: {
					tooltip: {},
				},
				stubs: {
					Draggable: DraggableStub,
					'v-button': true,
					'v-card': { template: '<div><slot /></div>' },
					'v-card-actions': { template: '<div><slot /></div>' },
					'v-card-text': { template: '<div><slot /></div>' },
					'v-card-title': { template: '<div><slot /></div>' },
					'v-dialog': true,
					'v-drawer': VDrawerStub,
					'v-form': VFormStub,
					'v-icon': true,
					'v-list': { template: '<div><slot /></div>' },
					'v-list-item': { template: '<button><slot /></button>' },
					'v-notice': true,
					'v-remove': true,
					'render-template': true,
				},
			},
		});

		await wrapper.find('button').trigger('click');

		const form = wrapper.findComponent(VFormStub);
		form.vm.$emit('update:modelValue', { title: 'Clean Code' });

		await wrapper.findComponent(VDrawerStub).vm.$emit('apply');

		expect(wrapper.emitted('input')?.at(-1)).toEqual([[{ title: 'Clean Code' }]]);
	});
});
