import Button from "shared/UI/Button/Button";
import cls from "./FormAddPet.module.scss";
import toast from "react-hot-toast";
import { FC, useEffect } from "react";
import { AddPetsActions, Pet, addPetPost } from "entities/AddPets";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { USER_LOCALSTORAGE_ID } from "shared/const/localStorage";
import Select from "shared/UI/Select/Select";

interface addPetsProps {
  addPet: Pet;
  addPetError: string;
}

const FormAddPet: FC<addPetsProps> = ({ addPet, addPetError }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(USER_LOCALSTORAGE_ID)) {
      const userIDLS = localStorage.getItem(USER_LOCALSTORAGE_ID);
      let userID = JSON.parse(userIDLS || "0");
      dispatch(AddPetsActions.setPets({ ownerId: userID }));
    }
  }, [dispatch]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(addPetPost(addPet)).unwrap();
      toast.success(`Питомец "${addPet.name}" успешно добавлен!`);
      dispatch(
        AddPetsActions.setPets({
          type: "",
          name: "",
          gender: "",
          age: "0",
          sterilized: false,
          vaccinated: false,
          ownerId: addPet.ownerId,
        })
      );
    } catch (error) {
      toast.error(`Ошибка при добавлении питомца: ${addPetError || error}`);
    }
  };

  const petTypeOptions = [
    { label: "Кошка", value: "Кошка" },
    { label: "Собака", value: "Собака" },
  ];

  const petGenderOptions = [
    { label: "Мальчик", value: "Мальчик" },
    { label: "Девочка", value: "Девочка" },
  ];

  useEffect(() => {
    if (addPet.gender === "") {
      dispatch(AddPetsActions.setPets({ gender: petGenderOptions[0].value }));
    }
    if (addPet.type === "") {
      dispatch(AddPetsActions.setPets({ type: petTypeOptions[0].value }));
    }
  }, [dispatch, petTypeOptions, petGenderOptions, addPet]);

  return (
    <div className={cls.FormAddPet}>
      <form className={cls.Forms} onSubmit={handleCreate}>
        <Select
          children="Выберите тип питомца"
          aria-label="Выберите тип питомца"
          options={petTypeOptions}
          value={addPet.type}
          onChange={(e) =>
            dispatch(AddPetsActions.setPets({ type: e.target.value }))
          }
        />
        <Select
          children="Выберите пол питомца"
          aria-label="Выберите пол питомца"
          options={petGenderOptions}
          value={addPet.gender}
          onChange={(e) =>
            dispatch(AddPetsActions.setPets({ gender: e.target.value }))
          }
        />
        <input
          type="text"
          placeholder="Имя питомца"
          value={addPet.name}
          onChange={(e) =>
            dispatch(AddPetsActions.setPets({ name: e.target.value }))
          }
          required
        />
        <input
          type="text"
          placeholder="Возраст"
          value={addPet.age}
          onChange={(e) =>
            dispatch(AddPetsActions.setPets({ age: e.target.value }))
          }
          required
        />
        <div className={cls.Forms_checkBox}>
          <div className={cls.checkBox}>
            <label htmlFor="scales">Питомец стерилизован?</label>
            <input
              type="checkbox"
              id="scales"
              name="scales"
              onChange={(e) =>
                dispatch(
                  AddPetsActions.setPets({ sterilized: e.target.checked })
                )
              }
            />
          </div>
          <div className={cls.checkBox}>
            <label htmlFor="st">Питомец привит?</label>
            <input
              type="checkbox"
              id="st"
              name="st"
              onChange={(e) =>
                dispatch(
                  AddPetsActions.setPets({ vaccinated: e.target.checked })
                )
              }
            />
          </div>
        </div>
        <Button type="submit">Добавить</Button>
      </form>
    </div>
  );
};

export default FormAddPet;
