/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuthState } from "@/shared/state/context";
import { Button } from "@/shared/components/Button";
import { ProfileImage } from "@/shared/components/ProfileImage";
import { UserEditForm } from "./UserEditForm";

export function ProfileCard({ user }) {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false);
  const [tempImage, setTempImage] = useState();

  const visibleUsername =
    user.id === authState.id ? authState.username : user.username;
  const isEditBtnVisible = !editMode && authState.id === user.id;

  return (
    <div className="card">
      <div className="card-header text-center">
        <ProfileImage width={200} tempImage={tempImage} image={user.image} />
      </div>
      <div className="card-body text-center">
        {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
        {isEditBtnVisible && (
          <Button
            onClick={() => {
              setEditMode(true);
            }}
          >
            Edit
          </Button>
        )}
        {editMode && (
          <UserEditForm setEditMode={setEditMode} setTempImage={setTempImage} />
        )}
      </div>
    </div>
  );
}
