import styled from 'styled-components';

import { MferAttribute } from '../types';

const TraitTable = styled.table`
	tr {
		td {
			font-size: 0.85rem;
			padding: 0.25rem 0.5rem;

			&:first-child {
				background: #b1d1f3;
				color: #235d9e;
			}

			&:last-child {
				background: #d6ecf9;
				color: black;
			}
		}
	}
`;

interface AttributesDisplayProps {
	attributes: MferAttribute[];
}

const AttributesDisplay: React.FC<AttributesDisplayProps> = ({
	attributes = [],
}) => (
	<TraitTable>
		<tbody>
			{attributes.map(attr => (
				<tr key={'attr-' + Math.random() * 100}>
					<td>
						<strong>{attr.trait_type}</strong>
					</td>
					<td>{attr.value}</td>
				</tr>
			))}
		</tbody>
	</TraitTable>
);

export default AttributesDisplay;
