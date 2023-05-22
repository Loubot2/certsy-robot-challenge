Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :robot_positions
    end
  end
end
