class CreateRobotPositions < ActiveRecord::Migration[7.0]
  def change
    create_table :robot_positions do |t|
      t.integer :x
      t.integer :y
      t.string :facing

      t.timestamps
    end
  end
end
