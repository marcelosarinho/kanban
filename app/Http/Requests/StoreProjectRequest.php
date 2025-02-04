<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Contracts\Validation\Validator;

class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'max:5|email',
            'description' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'name.max' => 'Erro 1',
            'name.email' => 'Erro 2',
            'description.required' => 'Descrição do projeto obrigatória!'
        ];
    }
}
