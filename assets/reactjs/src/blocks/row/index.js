const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks
import Edit from './Edit'
import Save from './Save'

registerBlockType('qubely/row', {
    title: __('Row'),
    category: 'qubely',
    description: 'Include unique row and column layouts with Qubely Row.',
    icon: <img src={qubely_admin.plugin + 'assets/img/blocks/block-row.svg'} alt={__('Row Block')} />,
    supports: { align: ['wide', 'center', 'full'] },
    keywords: [__('Row'), __('rw'), __('Layout')],
    attributes: {
        uniqueId: { type: 'string', default: '' },
        columns: { type: 'number', default: '' },

        // Dimension
        padding: { type: 'object', default: { md: { bottom: 70, top: 70, unit: 'px' } }, style: [{ selector: '{{QUBELY}}.qubely-section {padding: {{padding}};}' }] },
        margin: { type: 'object', default: { md: { bottom: 0, top: 0, unit: 'px' } }, style: [{ selector: '{{QUBELY}}.qubely-section {margin: {{margin}} !important;}' }] },

        rowGutter: {
            type: 'object', default: { md: 30, sm: 30, xs: 30, unit: 'px' }, style: [{
                selector:
                    '{{QUBELY}} .qubely-container {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                    '{{QUBELY}} .qubely-row {margin-left: calc(-{{rowGutter}}/2); margin-right: calc(-{{rowGutter}}/2);}' +
                    '{{QUBELY}} .qubely-row > .qubely-column {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                    '{{QUBELY}} .qubely-row * > [data-type="qubely/column"] {padding-left: calc({{rowGutter}}/2); padding-right: calc({{rowGutter}}/2);}' +
                    '.components-resizable-box__container.qubely-column-resizer.is-selected-column > span > .components-resizable-box__handle, ' +
                    'div[data-type="qubely/row"].is-selected .components-resizable-box__container.qubely-column-resizer > span > .components-resizable-box__handle,' +
                    'div[data-type="qubely/row"].is-resizing .components-resizable-box__container.qubely-column-resizer > span > .components-resizable-box__handle {right: calc(-{{rowGutter}}/2);}'
            }]
        },

        rowContainer: {
            type: 'object', default: { md: 1140, sm: 960, xs: 720, unit: 'px' },
            style: [
                {
                    condition: [
                        { key: 'align', relation: '==', value: 'full' },
                    ],
                    selector: '{{QUBELY}} .qubely-container {max-width: {{rowContainer}}; margin: 0 auto;}'
                }
            ]
        },
        position: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-row {-webkit-box-align: {{position}}; -ms-flex-align: {{position}}; align-items: {{position}}; }' }] },

        // Background
        rowBg: { type: 'object', default: { bgimgPosition: 'center center', bgimgSize: 'cover', bgimgRepeat: 'no-repeat', bgDefaultColor: '#f5f5f5' }, style: [{ selector: '{{QUBELY}}.qubely-section' }] },
        heightOptions: { type: 'string', default: 'auto' },
        rowHeight: {
            type: 'object', default: {},
            style: [
                {
                    condition: [
                        { key: 'heightOptions', relation: '==', value: 'custom' },
                    ],
                    selector: '{{QUBELY}} .qubely-row {min-height: {{rowHeight}};}'
                }
            ]
        },

        borderRadius: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}}.qubely-section, {{QUBELY}}.qubely-section .qubely-video-bg-wrap, {{QUBELY}}.qubely-section .qubely-row-overlay'
                }
            ]
        },

        rowShadow: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}}.qubely-section' }] },
        border: {
            type: 'object', default: {},
            style: [
                {
                    selector: '{{QUBELY}}.qubely-section'
                }
            ]
        },

        // Overlay
        enableRowOverlay: { type: 'boolean', default: false },
        rowOverlay: {
            type: 'object',
            default: {},
            style: [
                {
                    condition: [
                        { key: 'enableRowOverlay', relation: '==', value: true },
                    ],
                    selector: '{{QUBELY}} .qubely-row-overlay'
                }
            ]
        },
        rowBlend: { type: 'string', default: '', style: [{ selector: '{{QUBELY}} .qubely-row-overlay { mix-blend-mode: {{rowBlend}}; }' }] },
        rowOpacity: { type: 'number', default: '.8', style: [{ selector: '{{QUBELY}} .qubely-row-overlay {opacity: {{rowOpacity}}; }' }] },

        // Divider
        shapeTop: {
            type: 'object',
            default: {
                color: '#006fbf',
                width: { unit: '%' },
                height: { unit: 'px' },
            },
            style: [{ selector: '{{QUBELY}} .qubely-shape-divider.qubely-top-shape' }]
        },
        shapeBottom: {
            type: 'object',
            default: {
                color: '#006fbf',
                width: { unit: '%' },
                height: { unit: 'px' }
            },
            style: [{ selector: '{{QUBELY}} .qubely-shape-divider.qubely-bottom-shape' }]
        },

        // Responsive
        hideTablet: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}.qubely-section{ display:none; }' }] },
        hideMobile: { type: 'boolean', default: false, style: [{ selector: '{{QUBELY}}.qubely-section{ display:none; }' }] },

        // Advanced Settings
        rowId: { type: 'object', default: '' },
        rowZindex: { type: 'number', default: '', style: [{ selector: '{{QUBELY}}.qubely-section{z-index:{{rowZindex}};}' }] },
        rowReverse: { type: 'object', default: {}, style: [{ selector: '{{QUBELY}}.qubely-section .qubely-row, {{QUBELY}}.qubely-row > .editor-inner-blocks > .editor-block-list__layout{flex-direction:row-reverse;}' }] },

        rowCss: { type: 'string', default: '', style: [{ selector: '' }] },
        showGlobalSettings: { type: 'boolean', default: true },
    },
    edit: Edit,
    save: Save
});

