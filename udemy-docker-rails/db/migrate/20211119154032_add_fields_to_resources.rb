class AddFieldsToResources < ActiveRecord::Migration[6.1]
  def change
    add_column :resources, :resource_type, :string
    add_column :resources, :url, :string
  end
end
