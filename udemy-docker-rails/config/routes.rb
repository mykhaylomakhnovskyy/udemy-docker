Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :resources
    end
  end
  get '*path', to: 'homepage#index', via: :all
  root 'homepage#index'
end
