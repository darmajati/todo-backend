const { Todo } = require("../models");

module.exports = {
  getAllTodos: async (req, res) => {
    try {
      const loggedInUser = req.user;

      // Cari semua to-do list dari user tertentu berdasarkan user_id
      const todos = await Todo.findAll({
        where: {
          user_id: loggedInUser.id,
        },
      });

      return res.status(200).json(todos);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  },

  createTodo: async (req, res) => {
    try {
      const userId = req.user.id;
      const { title, description } = req.body;

      // Buat to-do list baru di database
      const newTodo = await Todo.create({
        title: title,
        description: description,
        status: false,
        user_id: userId,
      });

      return res.status(201).json(newTodo);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  },
  updateTodo: async (req, res) => {
    try {
      const todoId = req.params.id;
      const { title, description, status } = req.body;
  
      // Cari to-do list berdasarkan id
      const todo = await Todo.findByPk(todoId);
  
      // Jika to-do list tidak ditemukan, beri respons error
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
  
      // Update data to-do list
      if (title) {
        todo.title = title;
      }
      if (description) {
        todo.description = description;
      }
      if (status !== undefined) {
        todo.status = status;
      }
  
      // Simpan perubahan pada database
      await todo.save();
  
      return res.status(200).json(todo);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  },  
  deleteTodo: async (req, res) => {
    try {
      const todoId = req.params.id;
  
      // Cari to-do list berdasarkan id
      const todo = await Todo.findByPk(todoId);
  
      // Jika to-do list tidak ditemukan, beri respons error
      if (!todo) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      // Hapus to-do list dari database
      await todo.destroy();
  
      return res.status(200).json({ message: 'Todo deleted successfully' });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
}
};
