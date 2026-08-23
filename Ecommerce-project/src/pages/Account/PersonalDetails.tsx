import { useState } from "react";
import arrowDown from "../../assets/icons/ri_arrow-down-s-line.svg";
import eyeIcon from "../../assets/icons/ri_eye-line.svg";
import { useAuth } from "../../context/AuthContext";
import DeleteAccountModal from "./DeleteaccountModal";

const inputCls =
  "h-12 w-full rounded-[10px] border border-[#D4D4D4] px-4        text-sm text-[#171717] outline-none focus:border-[#171717]";

const labelCls = "  text-sm text-[#171717]";
const profile = {
  firstName: "Mark",
  lastName: "Jones",
  email: "markjones@gmail.com",
  phone: "08111386111",
  country: "Nigeria",
};

const PROFILE_ROWS: [string, string][] = [
  ["First Name", profile.firstName],
  ["Last Name", profile.lastName],
  ["Email Address", profile.email],
  ["Mobile Number", profile.phone],
  ["Country", profile.country],
];

type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  phone: string;
};

type PasswordDraft = {
  current: string;
  next: string;
  confirm: string;
};

const emptyPasswordDraft: PasswordDraft = {
  current: "",
  next: "",
  confirm: "",
};

type PasswordVisibility = { current: boolean; next: boolean; confirm: boolean };

const hiddenVisibility: PasswordVisibility = {
  current: false,
  next: false,
  confirm: false,
};

function TextField({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  );
}

function PasswordField({
  id,
  label,
  value,
  onChange,
  visible,
  onToggleVisible,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  visible: boolean;
  onToggleVisible: () => void;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className={labelCls}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={
            id === "currentPassword" ? "current-password" : "new-password"
          }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${inputCls} pr-11`}
        />
        <button
          type="button"
          onClick={onToggleVisible}
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-[#737373] hover:text-[#171717]"
        >
          <img src={eyeIcon} alt="" className="w-[24px] h-[24px]" />
        </button>
      </div>
      {error && <p className="       text-xs text-[#EF4444]">{error}</p>}
    </div>
  );
}

export default function PersonalDetails() {
  const { signOut } = useAuth();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDeleteAccount = () => {
    setConfirmDeleteOpen(true);
    signOut();
  };

  const [profile, setProfile] = useState<Profile>({
    firstName: "Mark",
    lastName: "Jones",
    email: "markjones@gmail.com",
    phone: "08111386111",
    country: "Nigeria",
  });

  const [draftProfile, setDraftProfile] = useState<Profile>(profile);
  const [isEditing, setIsEditing] = useState(false);

  const saveProfile = () => {
    setProfile(draftProfile);
    setIsEditing(false);
  };

  const startEditing = () => {
    setDraftProfile(profile);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setDraftProfile(profile);
    setIsEditing(false);
  };

  const [isChangingPassword, setIsChangingPassword] = useState(true);
  const [passwordDraft, setPasswordDraft] =
    useState<PasswordDraft>(emptyPasswordDraft);
  const [visible, setVisible] = useState<PasswordVisibility>(hiddenVisibility);

  const startChangingPassword = () => {
    setPasswordDraft(emptyPasswordDraft);
    setVisible(hiddenVisibility);
    setIsChangingPassword(false);
  };

  const cancelChangingPassword = () => {
    setPasswordDraft(emptyPasswordDraft);
    setIsChangingPassword(true);
  };

  const savePassword = () => {
    // TODO: send { current, next } to the backend — current password gets
    // verified server-side, not here. This just closes the form for now.
    setPasswordDraft(emptyPasswordDraft);
    setIsChangingPassword(true);
  };

  const passwordsMismatch =
    passwordDraft.confirm.length > 0 &&
    passwordDraft.next !== passwordDraft.confirm;

  const canSavePassword =
    passwordDraft.current.length > 0 &&
    passwordDraft.next.length > 0 &&
    passwordDraft.next === passwordDraft.confirm;

  return (
    <div className=" relative flex flex-col gap-[32px] max-w-[549px]">
      <h1 className="text-[23px] font-bold        leading-[28px] tracking-[-1] font-[700] text-[#171717]">
        Personal Details
      </h1>
      <section className="p-[24px] ">
        <div className="flex texts-center justify-between">
          <h3 className="text-base        leading-[24px] font-semibold text-[#171717]">
            Profile
          </h3>
          <button
            type="button"
            onClick={startEditing}
            className="cursor-pointer        font-[500] text-base font-medium leading-[24px] text-[#262626] underline"
          >
            Edit
          </button>
        </div>

        {!isEditing ? (
          <dl className="mt-[24px] flex flex-col gap-[16px]">
            {PROFILE_ROWS.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[160px_1fr] gap-4">
                <dt className="       text-base font-semibold text-[#404040] leading-[24px]">
                  {label}
                </dt>
                <dd className="       text-base text-[#404040] leading-[24px]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <div className="mt-[24px] flex flex-col gap-[14px]">
            <div className="grid grid-cols-2 gap-[16px]">
              <TextField
                id="firstName"
                label="First Name"
                value={draftProfile.firstName}
                onChange={(v) =>
                  setDraftProfile({ ...draftProfile, firstName: v })
                }
              />
              <TextField
                id="lastName"
                label="Last Name"
                value={draftProfile.lastName}
                onChange={(v) =>
                  setDraftProfile({ ...draftProfile, lastName: v })
                }
              />
            </div>

            <TextField
              id="email"
              label="Email Address"
              value={draftProfile.email}
              onChange={(v) => setDraftProfile({ ...draftProfile, email: v })}
            />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="country" className={labelCls}>
                Country
              </label>
              <div className="relative">
                <select
                  id="country"
                  value={draftProfile.country}
                  onChange={(e) =>
                    setDraftProfile({
                      ...draftProfile,
                      country: e.target.value,
                    })
                  }
                  className={`${inputCls} appearance-none bg-white pr-10`}
                >
                  <option value="Nigeria">Nigeria</option>
                </select>
                <img
                  src={arrowDown}
                  alt=""
                  className="w-[24px] h-[24px] absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            <TextField
              id="phone"
              label="Mobile Number"
              value={draftProfile.phone}
              onChange={(v) => setDraftProfile({ ...draftProfile, phone: v })}
            />
            <div className="max-w-[286px] flex items-center gap-[16px]">
              <button
                type="button"
                onClick={saveProfile}
                className="px-[32px] py-[14px] cursor-pointer rounded-[43px] bg-[#171717] font-[600] text-sm text-[#FAFAFA] font-semibold leading-[20px] "
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className=" px-[32px] py-[14px] cursor-pointer rounded-[43px] border border-[#D4D4D4] text-sm text-[#404040]  font-semibold leading-[20px]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="flex flex-col gap-[24px] p-[24px]">
        <div className="flex texts-center justify-between">
          <h3 className="text-base        leading-[24px] font-semibold text-[#171717]">
            {isChangingPassword ? "Change Password" : "passwords"}
          </h3>

          {isChangingPassword && (
            <button
              type="button"
              onClick={startChangingPassword}
              className="cursor-pointer        font-[500] text-base font-medium leading-[24px] text-[#262626] underline"
            >
              Change Password
            </button>
          )}
        </div>

        {isChangingPassword ? (
          <p className="       font-[400] text-base leading-[24px] text-[#404040]">
            Last changed 2 days ago.
          </p>
        ) : (
          <div className="mt-[24px] flex flex-col gap-4">
            <PasswordField
              id="currentPassword"
              label="Current Password"
              value={passwordDraft.current}
              onChange={(v) =>
                setPasswordDraft({ ...passwordDraft, current: v })
              }
              visible={visible.current}
              onToggleVisible={() =>
                setVisible({ ...visible, current: !visible.current })
              }
            />
            <PasswordField
              id="newPassword"
              label="New Password"
              value={passwordDraft.next}
              onChange={(v) => setPasswordDraft({ ...passwordDraft, next: v })}
              visible={visible.next}
              onToggleVisible={() =>
                setVisible({ ...visible, next: !visible.next })
              }
            />
            <PasswordField
              id="confirmPassword"
              label="Re-enter New Password"
              value={passwordDraft.confirm}
              onChange={(v) =>
                setPasswordDraft({ ...passwordDraft, confirm: v })
              }
              visible={visible.confirm}
              onToggleVisible={() =>
                setVisible({ ...visible, confirm: !visible.confirm })
              }
              error={passwordsMismatch ? "Passwords don't match." : undefined}
            />

            <div className="mt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={savePassword}
                disabled={!canSavePassword}
                className="cursor-pointer rounded-full bg-[#171717] px-6 py-2.5        text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={cancelChangingPassword}
                className="cursor-pointer rounded-full border border-[#D4D4D4] bg-white px-6 py-2.5        text-sm font-medium text-[#171717]"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-[24px] p-[24px]">
        <p>Danger Zone</p>
        <p>
          This permanently removes your account and all data. This can't be
          undone.
        </p>
        <button
          type="button"
          onClick={() => setConfirmDeleteOpen(true)}
          className="max-w-[122px] px-[14px] py-[8px]        font-semibold text-[12px] leading-[16px] rounded-[43px] border border-[#D4D4D4] text-[#EF4444] cursor-pointer"
        >
          Delete Account
        </button>
      </div>
      <div className="flex justify-center texts-center">
        {confirmDeleteOpen && (
          <DeleteAccountModal
            onConfirm={handleDeleteAccount}
            onClose={() => setConfirmDeleteOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
