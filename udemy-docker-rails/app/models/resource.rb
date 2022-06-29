class Resource < ApplicationRecord
  default_scope { order(:id) }
end
