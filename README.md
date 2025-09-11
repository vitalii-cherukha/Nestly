# Nestly Project Developer Guide

### Working with branches algorithm

|  #  | Action                                                                         |     | Command                                                         |
| :-: | :----------------------------------------------------------------------------- | :-- | :-------------------------------------------------------------- |
|  1  | 🔴 **Обовʼязково** робимо pull останньої <br> версії main                      |     | `git checkout main` <br> `git pull origin main`                 |
|  2  | Видаляємо стару гілку                                                          |     | `git branch -d назва`                                           |
|  3  | Створюємо гілку і працюємо виключно там. <br> Назва починається з Вашого імені |     | `git checkout -b name/feature/my-feature`                       |
|  4  | Робіть ваші зміни, комітьте часто                                              |     | `git add .` <br> `git commit -m "Add feature: navbar dropdown"` |
|  5  | Пуште вашу гілку                                                               |     | `git push -u origin name/feature/my-feature`                    |
|  6  | 🟡 Обовʼязково вказуємо ревʼювера в pull request                               |     |                                                                 |

---

### Custom Packages

| List1            | List2       | List3       | List 4 | List5 |
| :--------------- | :---------- | :---------- | :----- | :---- |
| axios            | toaster     | next        | -      | -     |
| cookies          | yup         | react       | -      | -     |
| date-fns         | react-icons | react-dom   | -      | -     |
| formik           | zustand     | react-tabs  | -      | -     |
| modern-normalize | tanstack    | react-icons | -      | -     |

---

### .ENV

- `NEXT_PUBLIC_API_URL=` ваш localhost

---

### Images & Icons

---

- Всі картинки в `/public`
- Іконки використовуємо із `react-icons`

#### Icons Sheet

| #   | Icon Name    | Import code                                              |
| --- | ------------ | -------------------------------------------------------- |
| 1   | Google       | `import { FaGoogle } from "react-icons/fa";`             |
| 2   | ArrowDown    | `import { IoIosArrowDown } from "react-icons/io";`       |
| 3   | ArrowUp      | `import { IoIosArrowUp } from "react-icons/io";`         |
| 4   | Logout       | `import { LuLogOut } from "react-icons/lu";`             |
| 5   | Calendar     | `import { BsCalendar2Event } from "react-icons/bs";`     |
| 6   | Route        | `import { LuRoute } from "react-icons/lu";`              |
| 7   | Book         | `import { TbBook2 } from "react-icons/tb";`              |
| 8   | Avatar       | `import { RxAvatar } from "react-icons/rx";`             |
| 9   | Close        | `import { IoIosClose } from "react-icons/io";`           |
| 10  | Fork & Spoon | `import { ImSpoonKnife } from "react-icons/im";`         |
| 11  | Dumbbell     | `import { CiDumbbell } from "react-icons/ci";`           |
| 12  | Burger       | `import { GiHamburgerMenu } from "react-icons/gi";`      |
| 13  | Couch        | `import { LiaCouchSolid } from "react-icons/lia";`       |
| 14  | Trash can    | `import { TbTrashX } from "react-icons/tb";`             |
| 15  | Edit         | `import { FiEdit } from "react-icons/fi";`               |
| 16  | Arrow Left   | `import { MdKeyboardArrowLeft } from "react-icons/md";`  |
| 17  | Arrow Right  | `import { MdKeyboardArrowRight } from "react-icons/md";` |
| 18  | SignIn       | `import { GoSignIn } from "react-icons/go";`             |

---
