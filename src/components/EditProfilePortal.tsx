import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';

// TODO: Form submission flow
// SEE README FOR WHATS NEXT

interface ProfileFields {
	name: string;
	tagline: string;
	age: string;
	pronouns: string;
	location: string;
	bio_1: string;
	bio_2: string;
}

// TODO: type this
const EditProfileForm = ({
	profile,
	onSave,
}: {
	profile: any;
	onSave: SubmitHandler<ProfileFields>;
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProfileFields>();

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
			<br />

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
			<br />

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
			<br />

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
			<br />

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
			<br />

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
			<br />

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
			<br />
			<br />

			{/* SUBMIT BUTTON */}
			<input type="submit" />
			<input type="reset" />
		</form>
	);
};

// TODO: type this (and profile) properly
const EditProfilePortal = ({
	mferId,
	profile,
}: {
	mferId: number;
	profile: any;
}) => {
	const router = useRouter();
	const [isSaving, setIsSaving] = useState<boolean>(false);
	const [editModeIsActive, setEditModeIsActive] = useState<boolean>(false);

	const resetUI = () => {
		setEditModeIsActive(false);
		setIsSaving(false);
	};

	// Sends post req to edit profile data passed by form
	const onSave = (fields: ProfileFields) => {
		setIsSaving(true);

		const body = JSON.stringify({ mfer_id: mferId, ...fields });

		fetch(`/api/profile/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body,
		})
			.then(result => {
				// on success, reload the page to display updated data
				if (result.ok) {
					router.reload();
				} else {
					// check if unauthorized
					if (result.status === 403) {
						alert('unauthorized! must verify mfer');
						resetUI();
					}
				}
			})
			.catch(error => {
				console.error(error);
				resetUI();
			});
	};

	if (isSaving) return <div>saving...</div>;
	if (!editModeIsActive) {
		return (
			<div>
				<button onClick={() => setEditModeIsActive(true)}>EDIT PROFILE</button>
			</div>
		);
	}

	return (
		<div>
			<button onClick={() => setEditModeIsActive(false)}>CANCEL</button>
			<br />
			<br />
			<br />
			<EditProfileForm profile={profile} onSave={onSave} />
		</div>
	);
};

export default EditProfilePortal;
