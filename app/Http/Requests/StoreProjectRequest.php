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
            // 'name' => 'required',
            // 'description' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            // 'name.required' => 'Nome do projeto obrigatório!',
            // 'description.required' => 'Descrição do projeto obrigatória!'
        ];
    }

    // public function failedValidation(Validator $validator)
    // {
    //     return response()->json('falhou na validação');
    // }
}
