/**
 * @swagger
 * /login:
 *    post:
 *      summary: Произвести авторизацию
 *      description: Введите логин и пароль для получения токена
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/login"
 *      responses:
 *        200:
 *          description: Авторизация произведена успешно
 *        400:
 *          description: Пароль должен состоять только из цифр, и быть не менеее 6 символов или Email не валидный!
 *        401:
 *          description: Неверный email или пароль!
 * components:
 *   requestBodies:
 *     login:
 *       description: Свойства которые нужно отправлять.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test@gmail.com"
 *                 description: Электронный адрес
 *               password:
 *                 type: string
 *                 example: "123456789"
 *                 description: Пароль
 */

/**
* @swagger
* /register:
*    post:
*      summary: Регистрация пользователя в системе
*      description: Введите имя пользователя, электронный адрес, пароль и возраст
*      tags:
*        - Users
*      requestBody:
*        $ref: "#/components/requestBodies/register"
*      responses:
*        200:
*          description: Пользователь зарегистрирован!
*        400:
*          description: 1. Имя должно состоять только из букв
*                       2. Возраст не соответствует (от 18 до 99)
*                       3. Пароль должен состоять только из цифр, и быть не менеее 6 символов
*                       4. Email не валидный!
*                       5. Данный электронный адресс существует!
* components:
*   requestBodies:
*     register:
*       description: Свойства которые нужно отправлять.
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*                 example: "Test"
*                 description: Имя
*               email:
*                 type: string
*                 example: "test@gmail.com"
*                 description: Электронный адрес
*               password:
*                 type: string
*                 example: "123456789"
*                 description: Пароль
*               age:
*                 type: int
*                 example: 19
*                 description: Возраст пользователя
*/

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Получить список тасок
 *     description: Получение списка тасок из базы данных авторизованного пользователя.
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Успешно
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *     
 */

/**
* @swagger
* /todos:
*    post:
*      summary: Добавление таски
*      description: Введите текст таски и isCompleted
*      tags:
*        - Todos
*      requestBody:
*        $ref: "#/components/requestBodies/todos"
*      responses:
*        200:
*          description: Task добавлен
*        400:
*          description: 1. Текст задания отсутствует!
*                       2. IsCompleted -> Должен быть boolean!
*        401:
*         description: Unauthorized
*        403:
*         description: Forbidden
*      security:
*       - bearerAuth: []
* components:
*   requestBodies:
*     todos:
*       description: Свойства которые нужно отправлять.
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               title:
*                 type: string
*                 example: "Test"
*                 description: Сообщение
*               isCompleted:
*                 type: boolean
*                 example: false
*                 description: Выполнено или нет
*               
*/

/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     tags:
 *       - Todos
 *     summary: Частичное обновление таски
 *     description: Обновляет текст таски по его ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор таски.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Данные таски успешно обновлены.
 *       400:
 *         description: Текст задания отсутствует
 *       404:
 *         description: Таск не найден
 */

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: Удаление таски
 *     description: Удаление таски по ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор таски.
 *     responses:
 *       200:
 *         description: Данные таски успешно удалены.
 *       404:
 *         description: Таск не найден
 */

/**
 * @swagger
 * /todos/{id}/isCompleted:
 *   patch:
 *     tags:
 *       - Todos
 *     summary: Проставление выполненно или нет
 *     description: При обращении к определенному ID проставляет таску на true либо false.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор таски.
 *     responses:
 *       200:
 *         description: isCompleted изменен
 *       404:
 *         description: Таск не найден
 */