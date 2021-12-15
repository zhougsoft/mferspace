import { MferAttribute } from '../../types';
import * as S from './styled';

interface AttributesCardProps {
	attributes: MferAttribute[];
}

const AttributesCard: React.FC<AttributesCardProps> = ({ attributes = [] }) => (
	<S.TraitTable>
		<tbody>
			{attributes.map((attr, i) => (
				// TODO: write a util that creates a short uuid for component keys
				<tr key={`attr-${i}-${Math.random() * 100}`}>
					<td>
						<strong>{attr.trait_type}</strong>
					</td>
					<td>{attr.value}</td>
				</tr>
			))}
		</tbody>
	</S.TraitTable>
);

export default AttributesCard;
