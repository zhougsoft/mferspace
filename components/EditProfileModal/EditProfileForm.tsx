import { useForm, SubmitHandler } from 'react-hook-form';
import { EditProfileFields } from '../../types';

// TODO: type `profile`
const EditProfileForm = ({
	profile,
	onSave,
}: {
	profile: any;
	onSave: SubmitHandler<EditProfileFields>;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<EditProfileFields>();

	return (
		<form onSubmit={handleSubmit(onSave)}>
			{/* NAME */}
			<div>
				<label htmlFor="name">name</label>
				<input
					defaultValue={profile?.name || ''}
					placeholder="name"
					{...register('name', { maxLength: 50 })}
					autoComplete="off"
				/>
				{errors.name && <span>max length 50 chars</span>}
			</div>

			{/* TAGLINE */}
			<div>
				<label htmlFor="tagline">tagline</label>
				<input
					defaultValue={profile?.tagline || ''}
					placeholder="tagline"
					{...register('tagline', { maxLength: 140 })}
					autoComplete="off"
				/>
				{errors.tagline && <span>max length 140 chars</span>}
			</div>

			{/* AGE */}
			<div>
				<label htmlFor="age">age</label>
				<input
					defaultValue={profile?.age || ''}
					placeholder="age"
					{...register('age', { maxLength: 25 })}
					autoComplete="off"
				/>
				{errors.age && <span>max length 25 chars</span>}
			</div>

			{/* PRONOUNS */}
			<div>
				<label htmlFor="pronouns">pronouns</label>
				<input
					defaultValue={profile?.pronouns || ''}
					placeholder="pronouns"
					{...register('pronouns', { maxLength: 50 })}
					autoComplete="off"
				/>
				{errors.pronouns && <span>max length 50 chars</span>}
			</div>

			{/* LOCATION */}
			<div>
				<label htmlFor="location">location</label>
				<input
					defaultValue={profile?.location || ''}
					placeholder="location"
					{...register('location', { maxLength: 100 })}
					autoComplete="off"
				/>
				{errors.location && <span>max length 100 chars</span>}
			</div>

			{/* BIO_1 */}
			<div>
				<label htmlFor="bio_1">about you</label>
				<textarea
					defaultValue={profile?.bio_1 || ''}
					placeholder="about you"
					{...register('bio_1', { maxLength: 5000 })}
					autoComplete="off"
				/>
				{errors.bio_1 && <span>max length 1000 chars</span>}
			</div>

			{/* BIO_2 */}
			<div>
				<label htmlFor="bio_2">who you&apos;d like to meet</label>
				<textarea
					defaultValue={profile?.bio_2 || ''}
					placeholder="who you'd like to meet"
					{...register('bio_2', { maxLength: 5000 })}
					autoComplete="off"
				/>
				{errors.bio_2 && <span>max length 1000 chars</span>}
			</div>

			{/* BUTTON GROUP */}
			<div>
				<button type="submit">submit</button>
				<button type="reset">reset</button>
			</div>
		</form>
	);
};

export default EditProfileForm;
