class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :title, limit: 255

      t.timestamps
    end
  end
end
